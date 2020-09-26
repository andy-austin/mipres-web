<template>
  <div class="row">
    <div class="col-12">
      <div class="card border-primary">
        <div class="card-header bg-primary text-uppercase text-white">Direccionamiento</div>
        <div class="card-body">
          <div class="row row-cols-2">
            <div class="col-4">
              <div class="card">
                <div class="card-header text-uppercase">Desde - Hasta</div>
                <div class="card-body mt-1">
                  <div class="form-group">
                    <date-picker v-model="dates" range :disabled-date="disabled" @pick="pick"></date-picker>
                  </div>
                </div>
                <div class="card-footer text-center">
                  <button type="button" class="btn btn-primary btn-same-w" @click="searchAddresses" :disabled="!dates.length">
                    Aceptar
                  </button>
                </div>
              </div>
            </div>
            <div class="col-8">
              <div class="card">
                <div class="card-header text-uppercase">Descargar como</div>
                <div class="card-body card-body-height text-center text-muted">
                  <div v-if="loading">
                    <i class="fa fa-circle-o-notch fa-spin fa-3x mr-2"></i> Cargando...
                  </div>
                </div>
                <div class="card-footer text-center">
                  <button type="button" class="btn btn-outline-primary btn-same-w mr-3" @click="download('csv')" :disabled="loading || !dates.length">
                    <i class="fa" :class="loading ? 'fa-cog fa-spin' : 'fa-file-code-o'"></i> CSV
                  </button>
                  <button type="button" class="btn btn-outline-primary btn-same-w" @click="download('xlsx')" :disabled="loading || !dates.length">
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
import XLSX from 'xlsx';
import {addressing_headers} from "@/constants";

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
      this.$store.dispatch("getAddressing", this.getData()).then(({data}) => {
        const filename = 'direccionamientos';
        const content = XLSX.utils.json_to_sheet(data, {header: addressing_headers})
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, content, filename);
        XLSX.writeFile(workbook, `${filename}.${extension}`)
      });
    }
  }
};
</script>
