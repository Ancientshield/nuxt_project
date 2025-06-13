<template>
	<div class="justify-center">
		<div class="flex flex-col items-center">
			<h1 class="text-3xl font-bold">Movies</h1>
			<p class="text-gray-600">Search for your favorite movies</p>
		</div>
		<div v-if="!isLoggedIn">
			<UCard class="max-w-xs w-full mx-auto mt-8 text-center">
				<p class="text-red-500">Please log in to search!</p>
			</UCard>
		</div>
		<div v-else>
			<MovieSearch />
		</div>
	</div>
</template>

<script setup lang="ts">
	import { useAuth } from '~/composables/useAuth';
	const isLoggedIn = useAuth();
</script>
