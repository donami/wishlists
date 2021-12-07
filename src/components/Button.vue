<script lang="ts" setup>
import { defineProps, withDefaults, computed, CSSProperties } from 'vue';
import { useCssVar } from '@vueuse/core';

interface Props {
  type: 'primary' | 'plain' | 'white';
  size?: 'mini' | 'small' | 'medium' | 'large';
  tag?: 'router-link';
  to?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'plain',
  disabled: false,
});

// const buttonType = computed(
//   () => props.type  || 'plain'
// );

// const typeColor = computed(
//   () => {
//     const test = useCssVar(`--color-${props.type}`).value;
//     console.log('test', test);
//     return useCssVar(`--color-${props.type}`).value;
//   }
// )

const buttonStyle = computed(() => {
  let styles: { [key: string]: any } = {
    '--button-text-font-color': 'white',
  };
  if (props.type === 'primary') {
    styles = {
      ...styles,
      '--button-bg-color': `linear-gradient(
      286deg,
      rgb(76, 160, 252) 23%,
      rgb(224, 47, 238) 76%
    )`,
      '--button-text-bg-color': 'transparent',
    };
  } else if (props.type === 'white') {
    styles = {
      ...styles,
      '--button-bg-color': `linear-gradient(
      286deg,
      rgb(76, 160, 252) 23%,
      rgb(224, 47, 238) 76%
    )`,
      '--button-text-bg-color': '#fff',
      '--button-text-font-color': '#333',
    };
  } else {
    styles = {
      ...styles,
      '--button-bg-color': `linear-gradient(
      286deg,
      rgb(76, 160, 252) 23%,
      rgb(224, 47, 238) 76%
    )`,
      '--button-text-bg-color': 'rgb(16, 15, 17)',
    };
  }

  return styles as CSSProperties;
});

const buttonDisabled = computed(() => props.disabled);

const buttonSize = computed(() => {
  return props.size || 'medium';
});

const as = computed(() => props.tag || 'button');
</script>

<template>
  <!-- <button class="button" :style="{'--button-bg-color': 'red'}"> -->
  <component
    :is="as"
    :to="to"
    class="button"
    :style="buttonStyle"
    :class="[
      `button--${buttonSize}`,
      {
        'is-disabled': buttonDisabled,
      },
    ]"
    :disabled="buttonDisabled"
  >
    <span>
      <slot />
    </span>
  </component>
  <!-- <button
    class="button"
    :style="buttonStyle"
    :class="[
      `button--${buttonSize}`,
      {
        'is-disabled': buttonDisabled,
      },
    ]"
    :disabled="buttonDisabled"
  >
    <span>
      <slot />
    </span>
  </button> -->
</template>

<style lang="scss" scoped>
.button + .button {
  margin-left: 1rem;
}

.button--mini + .button--mini {
  margin-left: 0.5rem;
}
.button {
  white-space: nowrap;
  background: var(--button-bg-color);
  padding: 2px;
  border-radius: 6px;
  border: medium none;
  font-size: 14px;
  display: inline-block;
  text-decoration: none;
  font-weight: 400;

  transition: all 0.2s ease-in-out;

  &:hover:not(:disabled) {
    opacity: 0.8;
    cursor: pointer;
  }

  > span {
    background: var(--button-text-bg-color);
    display: block;
    border-radius: 4px;
    color: var(--button-text-font-color);
    padding: 4px 8px;
  }

  &--mini {
    padding: 2px;
    font-size: 0.7rem;
  }
  &--small {
    padding: 2px;
    font-size: 0.8rem;
  }
  &--medium {
    padding: 2px;
    font-size: 0.8rem;

    > span {
      padding: 10px 12px;
    }
  }
  &--large {
    padding: 6px;
    font-size: 1.2rem;
  }

  &.is-disabled {
    opacity: 0.6;
  }
}
</style>
