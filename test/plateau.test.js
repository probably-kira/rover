const Plateau = require('../src/objects/Plateau');

test('Plateau obj: should have width & height', () => {
    const p = new Plateau({width: 5, height: 5})
    expect(p.width).toEqual(5);
    expect(p.height).toEqual(5);
});

test('Plateau obj: should recognize given x', () => {
    const p = new Plateau({width: 5, height: 5});
    const r = p.isExistingCoord(20, true)
    const r2 = p.isExistingCoord(2, true)
    expect(r).toEqual(false);
    expect(r2).toEqual(true);
});

test('Plateau obj: should recognize given y', () => {
    const p = new Plateau({width: 5, height: 5});
    const r = p.isExistingCoord(20)
    const r2 = p.isExistingCoord(2)
    expect(r).toEqual(false);
    expect(r2).toEqual(true);
});

test('Plateau obj: should contain given valid coords', () => {
    const p = new Plateau({width: 5, height: 5});
    const r = p.contains(2, 3)
    expect(r).toEqual(true);
});

test('Plateau obj: should not contain given invalid coords', () => {
    const p = new Plateau({width: 5, height: 5});
    const r = p.contains(20, 30)
    expect(r).toEqual(false);
});