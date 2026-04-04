<script lang="ts">
    let {message}:{message: string} = $props()
</script>

<p class="panel_style">{message}</p>

<style>
    p {
        display: flex;
        justify-content: center;
        box-sizing: border-box;
        padding: 8px 32px;
        border-radius: 8px;
        max-width: 600px;
    }
</style>