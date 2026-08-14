<template>
  <main class="screen-wrapper">
    <div class="screen-wrapper__content">
      <slot />
    </div>
  </main>
</template>

<style scoped>
.screen-wrapper {
  display: grid;
  width: 100%;
  min-height: 100%;
  padding: 24px 12px;
  place-items: center;
}

.screen-wrapper__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: min(100%, 480px);
  text-align: center;
  height: 100%;
  justify-content: space-between;

  max-height: 560px;
}
</style>
