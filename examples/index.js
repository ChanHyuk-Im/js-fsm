import FSM from 'js-fsm';

const fsm = new FSM([
  {
    status: 'IDLE',
    from: ['STATUS_2'],
    to: ['STATUS_1', 'STATUS_2'],
    isFirst: true,
  },
  {
    status: 'STATUS_1',
    from: ['IDLE'],
    to: ['STATUS_2'],
  },
  {
    status: 'STATUS_2',
    from: ['STATUS_1', 'IDLE'],
    to: ['IDLE'],
  },
]);

console.log(fsm.configure);

fsm.to('STATUS_1');

console.log(fsm.previousStatus, '->', fsm.currentStatus);

fsm.to('STATUS_2');

console.log(fsm.previousStatus, '->', fsm.currentStatus);

fsm.to('IDLE');

console.log(fsm.previousStatus, '->', fsm.currentStatus);

fsm.to('STATUS_2');

console.log(fsm.previousStatus, '->', fsm.currentStatus);

try {
  fsm.to('STATUS_1');

  console.log(fsm.previousStatus, '->', fsm.currentStatus);

} catch (error) {
  console.log(error);

  fsm.reset();

  console.log(fsm.previousStatus, '->', fsm.currentStatus);
}
