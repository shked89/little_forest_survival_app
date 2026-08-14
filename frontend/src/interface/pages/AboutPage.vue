<script setup>
import ScreenWrapper from '@/interface/layout/ScreenWrapper.vue'
import ButtonUi from '@/interface/ui/ButtonUi.vue'
import { useNavigation } from '@/interface/composables/useNavigation.js'
import TextUi from '@/interface/ui/TextUi.vue';
import LinkUi from '@/interface/ui/LinkUi.vue';
import LineWrapper from '@/interface/layout/LineWrapper.vue';
import IconUi from '@/interface/ui/IconUi.vue';

const { goToRoute } = useNavigation()
</script>

<template>
  <ScreenWrapper>
    <TextUi
      tag="h1"
      text="About"
    />

    <div>

      <TextUi text="A small real-time survival game set in a little forest." />

      <TextUi text="Designed and developed by Dmitry Shkredov." />

      <TextUi text="Feel free to reach out or follow my work here:" />
    </div>

    <div>
      <LineWrapper
        tag="nav"
        aria-label="Contacts"
        class="wrapper__contacts"
      >

        <LinkUi href="https://github.com/shked89">
          <IconUi name="mdi:github" />
          <TextUi text="GitHub" />
        </LinkUi>

        <LinkUi href="https://www.linkedin.com/in/dmitry-shkredov-dev">
          <IconUi name="mdi:linkedin" />
          <TextUi text="LinkedIn" />
        </LinkUi>

        <LinkUi href="https://t.me/allsed0">
          <IconUi name="mdi:telegram" />
          <TextUi text="Telegram" />
        </LinkUi>

        <LinkUi href="mailto:dima.shkredov@gmail.com">
          <IconUi name="mdi:email" />
          <TextUi text="dima.shkredov@gmail.com" />
        </LinkUi>

      </LineWrapper>
    </div>

    <ButtonUi
      text="Back to menu"
      @click="goToRoute('home')"
    />
  </ScreenWrapper>
</template>

<style scoped>
.wrapper__contacts {
  padding: 20px 10px;
  gap: 24px;
}
</style>
