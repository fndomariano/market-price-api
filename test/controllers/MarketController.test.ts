import { MarketFactory } from "../factories/MarketFactory";

describe("Market Controller API Tests", () => {
  
  test("should return first page of markets", () => {
    // given
    for(let i = 0; i < 10; i++) {
      console.log(MarketFactory.generate());
    }

  });

});
