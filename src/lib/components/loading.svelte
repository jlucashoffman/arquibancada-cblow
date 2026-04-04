<script lang="ts">
	let {
		label = 'Carregando',
		fullscreen = false,
		compact = false
	}: {
		label?: string;
		fullscreen?: boolean;
		compact?: boolean;
	} = $props();
</script>

<div class:fullscreen class="loading-wrapper" aria-live="polite" aria-busy="true">
	<div class:compact class="loading-card panel_style" role="status">
		<span class="spinner" aria-hidden="true"></span>

		<p class="label_text loading-text">
			{label}
			<span class="dots" aria-hidden="true">
				<span>.</span><span>.</span><span>.</span>
			</span>
		</p>
	</div>
</div>

<style>
	.loading-wrapper {
		display: grid;
		place-items: center;
		width: 100%;
		min-height: 12rem;
	}

	.loading-wrapper.fullscreen {
		min-height: 100dvh;
	}

	.loading-card {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.9rem 1rem;
		border-radius: 0.45rem;
		backdrop-filter: blur(2px);
	}

	.loading-card.compact {
		padding: 0.6rem 0.75rem;
		gap: 0.6rem;
	}

	.spinner {
		width: 1.1rem;
		aspect-ratio: 1;
		border-radius: 999px;
		border: 2px solid oklch(1 0 0 / 0.2);
		border-top-color: var(--color-brand-main);
		box-shadow: 0 0 18px var(--color-brand-shadow-effect-main);
		animation: spin 0.8s linear infinite;
	}

	.loading-text {
		color: var(--color-text);
		line-height: 1;
		display: flex;
		align-items: center;
		gap: 0.2rem;
	}

	.dots {
		display: inline-flex;
		width: 1.3em;
		justify-content: space-between;
	}

	.dots span {
		opacity: 0;
		animation: dot-fade 1.1s infinite;
	}

	.dots span:nth-child(2) {
		animation-delay: 0.2s;
	}

	.dots span:nth-child(3) {
		animation-delay: 0.4s;
	}

	@keyframes spin {
		to {
			transform: rotate(1turn);
		}
	}

	@keyframes dot-fade {
		0%,
		20% {
			opacity: 0;
		}

		40%,
		100% {
			opacity: 1;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.spinner,
		.dots span {
			animation: none;
			opacity: 1;
		}
	}
</style>
