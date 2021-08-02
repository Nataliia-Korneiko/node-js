const cats = [
  {
    _id: '5f8382425ba83a4f1829ca5c',
    name: 'Lama',
    age: 2.0,
    features: ['ходит в лоток', 'не дает себя гладить', 'серый'],
  },

  {
    _id: '5f8382425ba83a4f1829ca5d',
    name: 'Liza',
    age: 4.0,
    features: ['ходит в лоток', 'дает себя гладить', 'белый'],
  },
];

const newCat = {
  name: 'New',
  age: 1.0,
  features: ['ходит в лоток', 'дает себя гладить', 'белый'],
};

module.exports = { cats, newCat };
