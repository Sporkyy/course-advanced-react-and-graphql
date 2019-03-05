function Person(name, foods) {
  this.name = name;
  this.foods = foods;
}

Person.prototype.fetchFaveFoods = function() {
  return new Promise((resolve, reject) => {
    // Simulate and API
    setTimeout(() => resolve(this.foods), 2000);
  });
};

describe('mocking learning', () => {
  it('Mocks a reg function', () => {
    const fetchDogs = jest.fn();
    fetchDogs('snickers');
    expect(fetchDogs).toHaveBeenCalled();
    expect(fetchDogs).toHaveBeenCalledWith('snickers');
    fetchDogs('Hugo');
    expect(fetchDogs).toHaveBeenCalledTimes(2);
  });

  it('Can create a Person', () => {
    const me = new Person('Wes', ['pizza', 'burgs']);
    expect(me.name).toBe('Wes');
  });

  it('Can fetch foods', async () => {
    const me = new Person('Wes', ['pizza', 'burgs']);
    // Mock the favFoods function
    me.fetchFaveFoods = jest.fn().mockResolvedValue(['sushi', 'ramen']);
    const favFoods = await me.fetchFaveFoods();
    console.log(favFoods);
    expect(favFoods).toContain('sushi');
  });
});
