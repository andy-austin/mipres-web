<template>
  <validation-provider rules="required" v-slot="{ errors }">
    <div class="form-group">
      <label>{{ label }}</label>
      <input v-model="value" type="text" :class="`form-control ${_class(errors[0])}`" @input="$emit('input', value)"/>
      <span class="invalid-feedback">{{ errors[0] }}</span>
    </div>
  </validation-provider>
</template>

<script>
import {ValidationProvider} from 'vee-validate';

export default {
  name: "AppInput",
  components: {ValidationProvider},
  props: {
    label: String,
    model: String,
    required: Boolean,
    validated: Boolean,
  },
  data() {
    return {
      value: this.model
    }
  },
  methods: {
    _class: function (errors) {
      return errors ? 'is-invalid' : this.validated && 'is-valid';
    }
  }
};
</script>
