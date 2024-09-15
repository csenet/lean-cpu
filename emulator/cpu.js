var editor = ace.edit("editor");
var RubyMode = ace.require("ace/mode/ruby").Mode;
editor.getSession().setMode(new RubyMode());

// Mini Mini CPU emulator for education

const programInput = document.getElementById('editor');
const memoryOutput = document.getElementById('output');
const accOutput = document.getElementById('acc');
const idxOutput = document.getElementById('idx');
// const pcOutput = document.getElementById('pc');

// Memory

var mem = new Array(256); // メモリサイズは256バイト
for (var i = 0; i < 256; i++) mem[i] = 0;

let pc = 0; // Program Counter
let acc = 0; // Accumulator
let idx = 0; // Index Register

let codeLength = 0; // プログラムの長さ

let running = false; // CPUの実行状態

// Instructions

const operations = {
  'nop': 0x00,
  'stop': 0x02,
  'load': 0x04,
  'loadx': 0x06,
  'store': 0x08,
  'storex': 0x0A,
  'addi': 0x0C, 'add': 0x0D,
  'subi': 0x0E, 'sub': 0x0F,
  'iload': 0x10,
  'iaddi': 0x12, 'iadd': 0x13,
  'isubi': 0x14, 'isub': 0x15,
  'ifz': 0x16,
  'ifnz': 0x18,
  'ifp': 0x1A,
  'ifn': 0x1C,
  'jump': 0x1E,
  'neg': 0x20,
};

function assemble(inputCode) {
  // 1行ずつ読み込む
  const lines = inputCode.split('\n');
  /*
   Format:
    label: operation operand
  */
  let labels = {};
  let instructions = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.match(/^ *$/)) {
      // 空行の場合はnop命令を追加
      instructions.push({ operation: 'nop', operand: '0' });
      continue;
    }
    const matched_line = line.match(/^ *(|[A-Za-z][A-Za-z0-9]*:) *([-a-z0-9]+) *([-A-Za-z0-9]*) *$/);
    if (matched_line === null) {
      throw new Error(`Syntax error: ${line}`);
    }
    const [, label, operation, operand] = matched_line;
    instructions.push({ operation, operand });
    if (label !== '') {
      labels[label.substring(0, label.length - 1)] = i;
    }
  }
  // operationをopcodeに変換
  for (let i = 0; i < instructions.length; i++) {
    const { operation, operand } = instructions[i];
    if (operation.match(/^[-0-9]+$/)) {
      // 値はメモリにそのまま格納するため，opcodeは-1
      instructions[i].opcode = -1;
      continue;
    }
    if (operations[operation] === undefined) {
      throw new Error(`Unknown operation: ${operation}`);
    } else {
      instructions[i].opcode = operations[operation];
    }
  }

  // ラベルをアドレスに変換
  for (let i = 0; i < instructions.length; i++) {
    const { operand } = instructions[i];
    if (operand === '') continue;
    // 数値の場合はそのまま代入する命令
    if (operand.match(/^[-0-9]+$/)) {
      // 数値の場合はそのまま代入する命令
      instructions[i].operand = parseInt(operand);
    } else if (labels[operand] === undefined) {
      throw new Error(`Unknown label: ${operand}`);
    } else {
      // 文字列の場合はラベルをアドレスに変換
      instructions[i].operand = labels[operand];
      instructions[i].opcode++;
    }
  }
  return instructions;
};

function step() {
  /* プログラムカウンタの異常終了 */
  if (pc < 0 || pc >= 256) {
    throw new Error(`Program Counter out of range: ${pc}`);
  }
  // 1. 命令をfetchする
  const inst = mem[pc];
  pc++;
  // 2. 命令をdecodeする
  const opcode = inst >>> 16;
  const operand = inst & 0xFFFF;
  // 3. 命令をexecuteする
  switch (opcode) {
    case 0x00: case 0x01: break; // nop
    case 0x02: case 0x03: running = false; break; // stop
    case 0x04: acc = operand; break; // load
    case 0x05: acc = mem[operand]; break;
    case 0x06: acc = idx + operand; break; // loadx
    case 0x07: acc = mem[idx + operand]; break;
    case 0x08: case 0x09: mem[operand] = acc; break; // store
    case 0x0a: case 0x0b: mem[operand + idx] = acc; break; // storex
    case 0x0c: acc += operand; break; // addi
    case 0x0d: acc += mem[operand]; break; // add
    case 0x0e: acc -= operand; break; // subi
    case 0x0f: acc -= mem[operand]; break; // sub
    case 0x10: idx = operand; break; // iload
    case 0x11: idx = mem[operand]; break;
    case 0x12: idx += operand; break; // iaddi
    case 0x13: idx += mem[operand]; break; // iadd
    case 0x14: idx -= operand; break; // isubi
    case 0x15: idx -= mem[operand]; break; // isub
    case 0x16: case 0x17: if (acc === 0) pc = operand; break; // ifz
    case 0x18: case 0x19: if (acc !== 0) pc = operand; break; // ifnz
    case 0x1a: case 0x1b: if (acc > 0) pc = operand; break; // ifp
    case 0x1c: case 0x1d: if (acc < 0) pc = operand; break; // ifn
    case 0x1e: case 0x1f: pc = operand; break; // jump
    case 0x20: acc = -acc; break; // neg
    default: running = false; throw new Error(`Unknown opcode: ${opcode}`);
  }
  dumpMemory();
  if (running) { setTimeout(step, 1000); return; }
}

function dumpMemory() {
  // 実行中の行をハイライトする
  editor.focus();
  editor.gotoLine(pc + 1);

  accOutput.value = acc.toString(16);
  console.log(acc);
  idxOutput.value = idx.toString(16);
  // pcOutput.value = pc.toString(16);
  let output = "";
  for (let i = 0; i < codeLength; i++) {
    // 16進数で表示する(4byte)
    // 0埋めで表示する
    const outputBytes = mem[i].toString(16).padStart(6, '0');
    output += `${outputBytes}\n`;
  }
  memoryOutput.value = output;
}

function load(code) {
  const instructions = assemble(code);
  for (let i = 0; i < instructions.length; i++) {
    const { opcode, operand } = instructions[i];
    let inst = (opcode << 16) | (0xffff & operand);
    if (opcode === -1) {
      inst = operand;
    }
    mem[i] = inst;
  }
  return instructions.length;
}


function run() {
  editor.focus();
  editor.gotoLine(1);
  pc = 0;
  acc = 0;
  idx = 0;
  codeLength = load(editor.getValue());
  dumpMemory();
  running = true;
  setTimeout(step, 1000);
}

