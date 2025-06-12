<script setup lang="ts">
	const config = useRuntimeConfig();
	const apiKey = config.public.OMDB_API_KEY;
	const query = ref('');
	interface IMovies {
		Title: string;
		Year: string;
		imdbID: string;
		Type: string;
		Poster: string;
	}
	const movies = ref<IMovies[]>([]);
	const searchMovieById = async () => {
		const response: { Search?: IMovies[] } = await $fetch(
			`http://www.omdbapi.com/?apikey=${apiKey}&s=${query.value}`
		);
		movies.value = response.Search || [];
	};
</script>

<template>
	<form @submit.prevent="searchMovieById">
		<UInput v-model="query" class="m-3" type="text" />
		<UButton @click="searchMovieById">Search</UButton>
	</form>
	<ul class="flex flex-wrap gap-10 list-none">
		<li v-for="movie in movies" :key="movie.imdbID">
			<NuxtLink :to="`/movies/${movie.imdbID}`">
				<UCard class="w-64">
					<UCardHeader>
						<h3 class="text-base font-bold">{{ movie.Title }}</h3>
						<p class="text-sm text-gray-600">{{ movie.Year }}</p>
					</UCardHeader>
					<UCardBody>
						<img
							:src="movie.Poster"
							:alt="movie.Title"
							class="w-full h-64 object-cover"
						/>
					</UCardBody>
				</UCard>
			</NuxtLink>
		</li>
	</ul>
</template>

<style scoped></style>
