import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { EMPTY, Subject, catchError, startWith, switchMap, timer } from 'rxjs';

import { Pet, SPECIES_EMOJI, Species, mood } from '../../models/pet';
import { PetService } from '../../services/pet.service';
import { REFRESH_MS } from '../refresh';

@Component({
  selector: 'app-pet-list',
  imports: [FormsModule, RouterLink],
  templateUrl: './pet-list.html',
  styleUrl: './pet-list.css',
})
export class PetList implements OnInit {
  private readonly petService = inject(PetService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly reload = new Subject<void>();

  protected readonly pets = signal<Pet[]>([]);
  protected readonly error = signal<string | null>(null);
  protected readonly name = signal('');
  protected readonly species = signal<Species>('CAT');

  protected readonly speciesList = Object.keys(SPECIES_EMOJI) as Species[];
  protected readonly emoji = SPECIES_EMOJI;
  protected readonly mood = mood;

  ngOnInit(): void {
    this.reload
      .pipe(
        startWith(undefined),
        switchMap(() => timer(0, REFRESH_MS)),
        switchMap(() =>
          this.petService.findAll().pipe(
            catchError(() => {
              this.error.set('Backend unreachable 🔌');
              return EMPTY;
            }),
          ),
        ),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((pets) => {
        this.pets.set(pets);
        this.error.set(null);
      });
  }

  protected adopt(): void {
    this.petService.adopt(this.name(), this.species()).subscribe({
      next: () => {
        this.name.set('');
        this.reload.next();
      },
      error: (err) => this.error.set(err.error?.detail ?? 'Adoption failed'),
    });
  }
}
