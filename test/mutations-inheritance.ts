import { Module, Mutation, VuexModule } from "../src";
import Vuex, { Store } from "vuex";
import Vue from "vue";

Vue.use(Vuex);

class ParentModule extends VuexModule {
  foo = "init";

  @Mutation
  mutation1(value: string) {
    //
  }

  @Mutation
  mutation2(value: string) {
    //
  }

  @Mutation
  mutation3(value: string) {
    this.foo = value;
  }
}

@Module
class MyModule extends ParentModule {
  baz = "init";

  @Mutation
  mutation1(value: string) {
    this.baz = value;
  }

  @Mutation
  mutation2(value: string) {
    this.foo = value;
  }

  @Mutation
  mutation3(value: string) {
    super.mutation3(value);
    this.foo = this.foo + "child";
  }
}

describe("mutations-inheritance", () => {
  let store: Store<any>;
  let myModule: MyModule;

  beforeEach(() => {
    store = new Vuex.Store({});
    myModule = new MyModule({ store, name: "myModule" });
  });

  test("overriden mutation can modify state", () => {
    myModule.mutation1("bar");
    expect(myModule.baz).toBe("bar");
  });

  test("overriden mutation can modify parent state", () => {
    myModule.mutation2("bar");
    expect(myModule.foo).toBe("bar");
  });

  test("overriden mutation has access to parent method implementation", () => {
    myModule.mutation3("bar");
    expect(myModule.foo).toBe("barchild");
  });
});
