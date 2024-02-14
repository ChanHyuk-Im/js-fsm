# js-fsm
fsm library for javascript.

# Installation
```bash
npm install @chanim/js-fsm
```
# Example
```javascript
import FSM from '@chanim/js-fsm';

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
/*
{
  IDLE: {
    from: [ 'STATUS_2' ],
    to: [ 'STATUS_1', 'STATUS_2' ],
    isFirst: true
  },
  STATUS_1: { from: [ 'IDLE' ], to: [ 'STATUS_2' ] },
  STATUS_2: { from: [ 'STATUS_1', 'IDLE' ], to: [ 'IDLE' ] }
}
*/

fsm.to('STATUS_1');
console.log(fsm.previousStatus, '->', fsm.currentStatus); // IDLE -> STATUS_1
fsm.to('STATUS_2');
console.log(fsm.previousStatus, '->', fsm.currentStatus); // STATUS_1 -> STATUS_2
fsm.to('IDLE');
console.log(fsm.previousStatus, '->', fsm.currentStatus); // STATUS_2 -> IDLE
fsm.to('STATUS_2');
console.log(fsm.previousStatus, '->', fsm.currentStatus); // IDLE -> STATUS_2

fsm.to('STATUS_1'); // Error: Cannot change status from 'STATUS_2' to 'STATUS_1'.

fsm.reset();
console.log(fsm.previousStatus, '->', fsm.currentStatus); // null -> IDLE
```

# Usage
### FSM
`class` for making fsm instance.
#### parameter
`Array` of configure data.

If `isFirst` is `true`, the first status of fsm will be setting as that status. (* `isFirst` must given at least by one.)
|key|value type|required|default|example|
|---|---|---|---|---|
|status|`string`|o|x|`'IDLE'`|
|from|`string[]`|o|x|`['STATUS_2']`|
|to|`string[]`|o|x|`['IDLE', 'STATUS_1']`|
|isFirst|`boolean`|x|`false`|`true`|
```javascript
ConfigureData {
  status: string;
  from: string[];
  to: string[];
  isFirst: boolean;
}
```

### to
`method` for changing status to next status.
#### parameter
`STATUS`
```javascript
fsm.to('STATUS_1');
```

### reset
`method` for reset status.

- `previousStatus` to be `null`.
- `currentStatus` to be `firstStatus`.
```javascript
fsm.reset();
```

### configure
`variable` for fsm configure.
```javascript
console.log(fsm.configure);
/*
{
  IDLE: {
    from: [ 'STATUS_2' ],
    to: [ 'STATUS_1', 'STATUS_2' ],
    isFirst: true
  },
  STATUS_1: { from: [ 'IDLE' ], to: [ 'STATUS_2' ] },
  STATUS_2: { from: [ 'STATUS_1', 'IDLE' ], to: [ 'IDLE' ] }
}
*/
```

### previousStatus
`variable` for previous status.
```javascript
console.log(fsm.previousStatus); // IDLE
```

### currentStatus
`variable` for current status.
```javascript
console.log(fsm.currentStatus); // STATUS_1
```
