<template>
<div class="component">
  <div class="form" @keyup.enter="addPerson">
    <!-- Vue handles v-model binding differently for components than native <input> elements. To get the binding to
    work, we need to bind and update the value ourselves with :value="currentPerson.firstName"
    @input="currentPerson.firstName = $event.target.value". This is exactly how v-model works under the hood. -->
    <vaadin-text-field
      label="First Name"
      :value="currentPerson.firstName"
      @input="currentPerson.firstName = $event.target.value"
    ></vaadin-text-field>
    <vaadin-text-field
      label="Last Name"
      :value="currentPerson.lastName"
      @input="currentPerson.lastName = $event.target.value"
    ></vaadin-text-field>
    <vaadin-button @click="addPerson">Add</vaadin-button>
  </div>
  <vaadin-grid :items.prop="people"> 
    <vaadin-grid-column path="firstName" header="First name"></vaadin-grid-column>
    <vaadin-grid-column path="lastName" header="Last name"></vaadin-grid-column>
  </vaadin-grid>
</div>
</template>

<script>
import '@vaadin/vaadin-button';
import '@vaadin/vaadin-grid';
import '@vaadin/vaadin-text-field';

class Person {
  constructor() {
    this.firstName = "";
    this.lastName = "";
  }
}

export default {
  name: "HelloWorld",
  data: function() {
    return { 
      people: [],
      currentPerson: new Person()
    };
  },
  methods: {
    addPerson: function() { 
      this.people = [...this.people, this.currentPerson];
      this.currentPerson = new Person();
    }
  }
};
</script>

<style lang="sass" scoped>
.form {
  margin-bottom: 16px;
}
.form * {
  margin-right: 4px;
}
</style>
