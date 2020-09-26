<template>
  <ValidationObserver v-slot="{ invalid, validated }">
    <form class="needs-validation" novalidate @submit.prevent="submitForm">
      <div class="card-header bg-primary text-uppercase text-white">Datos Mipres</div>
      <div class="card-body px-5">
        <div class="alert alert-danger text-justify" v-if="errors">
          No es posible conectarse con el ministerio en este momento. Por favor revise sus credenciales.
        </div>
        <AppInput label="NIT" :model="model.nit" v-model="model.nit" required :validated="validated"></AppInput>
        <AppInput
            required
            label="Token Prescriptor"
            :model="model.token_pres"
            v-model="model.token_pres"
            :validated="validated">
        </AppInput>
        <AppInput
            required
            label="Token Proveedor"
            :model="model.token_prov"
            v-model="model.token_prov"
            :validated="validated">
        </AppInput>
      </div>
      <div class="card-footer text-center">
        <button type="submit" class="btn btn-primary btn-same-w" :disabled="invalid">
          <i class="fa fa-cog fa-spin" v-if="loading"></i> Iniciar
        </button>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import {ValidationObserver} from 'vee-validate';
import AppInput from '../components/Input';
import router from "../router";

export default {
  name: "Login",
  components: {ValidationObserver, AppInput},
  data: () => {
    return {
      errors: false,
      loading: false,
      model: {
        nit: '900285194',
        token_pres: '4963124D-A022-4859-A008-B336025B76DA',
        token_prov: '4963124D-A022-4859-A008-B336025B76DA',
      }
    };
  },
  methods: {
    submitForm() {
      this.errors = false;
      this.loading = true;
      this.$store.dispatch("doLogin", this.model).then(
          () => router.push("/"),
          () => {
            this.errors = true;
            this.loading = false;
          },
      );
    }
  }
};
</script>
