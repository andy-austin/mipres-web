<template>
  <div class="row">
    <div class="col-12">
      <div class="card border-primary">
        <div class="card-header bg-primary text-uppercase text-white card-actions">
          Direccionamiento
          <span class="text-right">
            <span class="badge badge-light">NIT - {{ $store.state.nit }}</span>
            <button class="btn btn-outline-light btn-sm ml-2" @click="logout">Salir</button>
          </span>
        </div>
        <div class="card-body">
          <div class="row row-cols-md-2">
            <div class="col-md-4 mb-3">
              <div class="card">
                <div class="card-header text-uppercase">Desde - Hasta</div>
                <div class="card-body mt-1">
                  <div class="form-group">
                    <date-picker v-model="dates" range :disabled-date="disabled" @pick="pick"></date-picker>
                  </div>
                </div>
                <div class="card-footer text-center">
                  <button
                      type="button"
                      class="btn btn-primary btn-same-w"
                      @click="searchAddresses"
                      :disabled="!dates.length">
                    Aceptar
                  </button>
                </div>
              </div>
            </div>
            <div class="col-md-8">
              <div class="card">
                <div class="card-header text-uppercase">Descargar como</div>
                <div class="card-body card-body-height text-center text-muted">
                  <div v-if="loading">
                    <i class="fa fa-circle-o-notch fa-spin fa-3x mr-2"></i> Cargando...
                  </div>
                </div>
                <div class="card-footer text-center">
                  <button type="button"
                          class="btn btn-outline-primary btn-same-w mr-3"
                          @click="download('csv')"
                          :disabled="loading || !dates.length">
                    <i class="fa" :class="loading ? 'fa-cog fa-spin' : 'fa-file-code-o'"></i> CSV
                  </button>
                  <button type="button"
                          class="btn btn-outline-primary btn-same-w"
                          @click="download('xlsx')"
                          :disabled="loading || !dates.length">
                    <i class="fa" :class="loading ? 'fa-cog fa-spin' : 'fa-file-excel-o'"></i> XLSX
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import {downloadFile} from "@/services/file";

export default {
  name: "Home",
  components: {DatePicker},
  data() {
    return {
      dates: [],
      start: null,
      loading: false
    };
  },
  methods: {
    getData() {
      const [start, end] = this.dates;
      return {
        startDate: this.$moment(start).format('YYYY-MM-DD'),
        endDate: this.$moment(end).format('YYYY-MM-DD')
      };
    },
    searchAddresses() {
      this.loading = true;
      this.$store.dispatch("saveAddressing", this.getData()).then(() => {
        this.loading = false;
      });
    },
    pick(date) {
      this.start = this.start ? null : this.$moment(date).add(15, 'days');
    },
    disabled(date) {
      return this.start && this.start < this.$moment(date);
    },
    download(extension) {
      const data = this.getData();
      this.$store.dispatch("getAddressing", data).then(({data}) => {
        downloadFile(extension, this.$store.state.nit, data);
      });
    },
    logout() {
      this.$store.commit('logout');
    }
  }
};
</script>
