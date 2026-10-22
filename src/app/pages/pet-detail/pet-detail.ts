import { Component, DestroyRef, OnInit, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import { EMPTY, catchError, switchMap, timer } from 'rxjs';

import { Pet, PetAction, SPECIES_EMOJI, mood } from '../../models/pet';
import { PetService } from '../../services/pet.service';
import { REFRESH_MS } from '../refresh';

@Component({
  selector: 'app-pet-detail',
  imports: [RouterLink],
  templateUrl: './pet-detail.html',
  styleUrl: './pet-detail.css',
})
export class PetDetail implements OnInit {
  private readonly petService = inject(PetService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  readonly id = input.required<string>();

  protected readonly pet = signal<Pet | null>(null);
  protected readonly error = signal<string | null>(null);
  protected readonly actions: PetAction[] = ['feed', 'play', 'sleep'];
  protected readonly emoji = SPECIES_EMOJI;
  protected readonly mood = mood;

  ngOnInit(): void {
    timer(0, REFRESH_MS)
      .pipe(
        switchMap(() =>
          this.petService.findById(this.petId()).pipe(
            catchError((err) => {
              this.error.set(err.error?.detail ?? 'Backend unreachable 🔌');
              return EMPTY;
            }),
          ),
        ),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((pet) => {
        this.pet.set(pet);
        this.error.set(null);
      });
  }

  protected act(action: PetAction): void {
    this.petService.act(this.petId(), action).subscribe({
      next: (pet) => this.pet.set(pet),
      error: (err) => this.error.set(err.error?.detail ?? `Could not ${action}`),
    });
  }

  protected release(): void {
    this.petService.release(this.petId()).subscribe(() => this.router.navigate(['/']));
  }

  private petId(): number {
    return Number(this.id());
  }
}
