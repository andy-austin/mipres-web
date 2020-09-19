<template>
  <ValidationObserver v-slot="{ invalid, validated }">
    <form class="needs-validation" novalidate @submit.prevent="submitForm">
      <div class="card-header">Datos Mipres</div>
      <div class="card-body px-5">

        <AppInput label="NIT" v-model="model.nit" required :validated="validated"></AppInput>
        <AppInput label="Token Prescriptor" v-model="model.token_prep" required :validated="validated"></AppInput>
        <AppInput label="Token Proveedor" v-model="model.token_prov" required :validated="validated"></AppInput>

        <div class="form-group text-center">
          <button type="submit" class="btn btn-primary" :disabled="invalid">Iniciar</button>
        </div>

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
      model: {
        nit: '',
        token_prep: '',
        token_prov: '',
      }
    };
  },
  methods: {
    submitForm() {
      this.$store.dispatch("doLogin", this.model).then(() => router.push("/"));
    }
  }
};
</script>
