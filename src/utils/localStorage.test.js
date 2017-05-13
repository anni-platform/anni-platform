import { isNewState } from './localStorage';


describe('localStorage.isNewState', () => {

  it('returns true when state is new', () => {
    expect(
      isNewState({ 1: 1 }, { 1: 2 })
    ).toEqual(true);

    expect(
      isNewState({ 1: 1 }, { 1: { 1: 1} })
    ).toEqual(true);
  });

  it('returns false when state is not new', () => {
    expect(
        isNewState({ 1: 1 }, { 1: 1 })
    ).toEqual(false);

    expect(
        isNewState({ 1: { 1: { 1: 1 } } }, { 1: { 1: { 1: 1 } } })
    ).toEqual(false);
  });

});