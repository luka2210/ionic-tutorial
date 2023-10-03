import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { MovieService } from 'src/app/services/movie.service'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  movies: any[] = [];
  currentPage = 1;
  imageBaseUrl = environment.images;

  $topMovies?: Subscription;

  constructor(private movieService: MovieService, private loadingController: LoadingController) { }

  ngOnInit() {
    this.loadMovies();
  }

  async loadMovies(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingController.create({
      message: 'Loading..',
      spinner: 'bubbles'
    })
    await loading.present();

    this.$topMovies = this.movieService.getTopRatedMovies(this.currentPage).subscribe({
      next: content => {
        loading.dismiss();
        this.movies = [...this.movies, ...content.results];
        console.log(content);

        event?.target.complete();
        if (event) {
          event.target.disabled = content.total_pages === this.currentPage;
        }
      },
      error: err => console.log(err)
    });
  }

  loadMore(event: any) {
    this.currentPage++;
    this.loadMovies(event);
  }

  ngOnDestroy() {
    this.$topMovies?.unsubscribe();
  }
}
