import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {
  movie: any;
  imageBaseUrl = environment.images;

  $movie?: Subscription;

  constructor(private route: ActivatedRoute, private movieService: MovieService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.getMovie(id);
  }

  getMovie(id: any) {
    this.$movie = this.movieService.getMovieDetails(id).subscribe({
      next: content => {
        this.movie = content;
        console.log(this.movie);
      },
      error: err => console.log(err)
    })
  }

  ngOnDestroy() {
    this.$movie?.unsubscribe();
  }
}
