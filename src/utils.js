export function equals(cursor1, cursor2) {
  return cursor1.x === cursor2.x && cursor1.y === cursor2.y;
}

export function liesOn(note, x) {
  return note.x <= x && note.x + note.length > x;
}

export function overlapsWith(note1, note2) {
  return (
    note1.y === note2.y &&
    note1.x < note2.x + note2.length &&
    note1.x + note1.length > note2.x
  );
}

export function groupBy(notes, keyfunc) {
  return notes.reduce((obj, note) => {
    const key = keyfunc(note);
    return { ...obj, [key]: [...(obj[key] || []), note] };
  }, {});
}

export function sleep(sec) {
  return new Promise(resolve => {
    setTimeout(resolve, 1000 * sec);
  });
}

export function toLocaleDateString(date) {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  return `${y}-${('0' + m).slice(-2)}-${('0' + d).slice(-2)}`;
}
