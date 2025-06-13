<template>
	<div class="flex flex-col items-center min-h-screen">
		<div class="w-full flex flex-col items-center">
			<h1 class="text-3xl font-bold mb-1">Home</h1>
			<UCard class="max-w-xs w-full mb-5">
				<form
					v-if="!isLoggedIn"
					class="flex flex-col gap-4"
					@submit.prevent="login"
				>
					<UInput v-model="username" placeholder="account" />
					<UInput v-model="password" type="password" placeholder="password" />
					<UButton type="submit" color="primary" block>Login</UButton>
				</form>
				<div v-else class="text-center">
					<div class="mb-2">Already logged in</div>
					<UButton color="primary" @click="goMovies">前往 Movies 頁面</UButton>
					<UButton class="ml-2" @click="logout">Logout</UButton>
				</div>
			</UCard>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import { useRouter } from 'vue-router';
	import { useAuth } from '~/composables/useAuth';

	const isLoggedIn = useAuth();
	const username = ref('');
	const password = ref('');
	const router = useRouter();

	function login() {
		// 這裡可加驗證，範例直接登入
		isLoggedIn.value = true;
	}
	function logout() {
		isLoggedIn.value = false;
		username.value = '';
		password.value = '';
	}
	function goMovies() {
		router.push('/movies');
	}
</script>

<style scoped></style>
