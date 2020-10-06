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
                    <date-picker v-model="dates" range @pick="pick"></date-picker>
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
                  <div v-if="$store.state.report.loading">
                    <i class="fa fa-circle-o-notch fa-spin fa-3x mr-2"></i>
                    Cargando... ({{ $store.state.report.percent }}%)
                  </div>
                </div>
                <div class="card-footer text-center">
                  <button type="button"
                          class="btn btn-outline-primary btn-same-w mr-3"
                          @click="download('csv')"
                          :disabled="$store.state.report.loading || !dates.length">
                    <i class="fa" :class="$store.state.report.loading ? 'fa-cog fa-spin' : 'fa-file-code-o'"></i> CSV
                  </button>
                  <button type="button"
                          class="btn btn-outline-primary btn-same-w"
                          @click="download('xlsx')"
                          :disabled="$store.state.report.loading || !dates.length">
                    <i class="fa" :class="$store.state.report.loading ? 'fa-cog fa-spin' : 'fa-file-excel-o'"></i> XLSX
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
      start: null
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
      this.$store.dispatch("saveAddressing", this.getData());
    },
    pick(date) {
      this.start = this.start ? null : this.$moment(date).add(15, 'days');
    },
    download(extension) {
      this.$store.dispatch("getAddressing", this.getData()).then(({data}) => {
        downloadFile(extension, {...this.getData(), nit: this.$store.state.nit}, data);
      });
    },
    logout() {
      this.$store.commit('logout');
    }
  }
};
</script>
