
var ops = {
  '?': -1, nop: 0, stop: 2, load: 4, loadx: 6,
  store: 8, storex: 10, add: 12, sub: 14, iload: 16, iadd: 18,
  isub: 20, ifz: 22, ifnz: 24, ifp: 26, ifn: 28, jump: 30, neg: 32
};
var t0, t1, t2, t3, t4, r0, r1;
var acc, idx, tbl, opr, opd, lab, lns, mem, cnt;
function init() {
  t0 = document.getElementById('t0');
  t1 = document.getElementById('t1'); t1.value = '';
  t2 = document.getElementById('t2');
  t3 = document.getElementById('t3');
  t4 = document.getElementById('t4');
  r0 = document.getElementById('r0');
  r1 = document.getElementById('r1');
  for (var i = 0; i <= 20; ++i) { t1.value += (i + '\r\n'); }
}
function hex(i) {
  var s = i.toString(16);
  while (s.length <= 8) { s = ' ' + s; }
  return s;
}
function assemble() {
  var ret = true;
  var pat = /^ *(|[A-Za-z][A-Za-z0-9]*:) *([-a-z0-9]+) *([A-Za-z0-9]*) *$/;
  lns = t2.value.split(/[\r\n]+/), lab = [], opr = [], opd = [];
  for (var i = 0; i < lns.length; ++i) {
    var a = lns[i].match(pat);
    if (lns[i].match(/^ *$/)) {
      lab.push(''); opr.push('nop'); opd.push('0');
    } else if (a == null) {
      lab.push(''); opr.push('?'); opd.push('');
    } else {
      lab.push(a[1]); opr.push(a[2]); opd.push(a[3]);
    }
  }
  tbl = {}; t3.value = ''; mem = [];
  for (var i = 0; i < lns.length; ++i) {
    if (lab[i] == '') { continue; }
    if (tbl[lab[i].substring(0, lab[i].length - 1)] != null) {
      t3.value += 'label ' + lab[i] + " defined more than once.\r\n"; ret = false;
    }
    tbl[lab[i].substring(0, lab[i].length - 1)] = i;
  }
  for (var i = 0; i < lns.length; ++i) {
    var s = '';
    var opcode = ops[opr[i]];
    if (opr[i].match(/^[-0-9]+$/)) {
      opcode = 0; opd[i] = opr[i];
    } else if (opcode == undefined) {
      s = 'undef op:' + opr[i] + ' ';
    } else if (opcode < 0) {
      s = 'syntax error ';
    }
    var addr = 0; ++opcode;
    if (opd[i] == '') {
    } else if (opd[i].match(/^[-0-9]+$/)) {
      addr = parseInt(opd[i], 10); --opcode;
    } else if (tbl[opd[i]] == undefined) {
      s += 'undef label: ' + opd[i] + ' ';
    } else {
      addr = tbl[opd[i]];
    }
    if (s == '') {
      var inst = (opcode << 16) | (0xffff & addr);
      if (opcode == 0) { inst = addr; }
      s = hex(inst);
      if (s.length < 6) { s = '0' + s; }
      s += ' '; mem[i] = inst;
    } else { ret = false; }
    s += '# ' + lns[i];
    t3.value += s + '\r\n';
  }
  return ret;
}
var pc, running;
function run() {
  if (!assemble()) { alert('assemble error'); return; }
  cnt = new Array(500); acc = 0; idx = 0;
  //acc = parseInt(r0.value, 10); idx = parseInt(r1.value, 10);
  for (var i = 0; i < cnt.length; ++i) cnt[i] = 0;
  pc = 0; running = true; t3.value += 'execution start\r\n';
  setTimeout(step, 0);
  setTimeout(prof, 500);
}
function step() {
  if (pc < 0 || pc >= 500) {
    alert('illegal stop'); running = false; mdisp(); return;
  }
  var inst = mem[pc]; ++cnt[pc]; ++pc;
  var opcode = (inst >> 16 & 0xffff), addr = inst & 0xffff;
  switch (opcode) {
    case 0: case 1: break;
    case 2: case 3: running = false; t3.value += 'stop at: ' + (pc - 1) + '\r\n'; break;
    case 4: acc = addr; break;
    case 5: acc = mem[addr]; break;
    case 6: acc = addr + idx; break;
    case 7: acc = mem[addr + idx]; break;
    case 8: case 9: mem[addr] = acc; break;
    case 10: case 11: mem[addr + idx] = acc; break;
    case 12: acc += addr; break;
    case 13: acc += mem[addr]; break;
    case 14: acc -= addr; break;
    case 15: acc -= mem[addr]; break;
    case 16: idx = addr; break;
    case 17: idx = mem[addr]; break;
    case 18: idx += addr; break;
    case 19: idx += mem[addr]; break;
    case 20: idx -= addr; break;
    case 21: idx -= mem[addr]; break;
    case 22: case 23: if (acc == 0) { pc = addr; } break;
    case 24: case 25: if (acc != 0) { pc = addr; } break;
    case 26: case 27: if (acc > 0) { pc = addr; } break;
    case 28: case 29: if (acc < 0) { pc = addr; } break;
    case 30: case 31: pc = addr; break;
    case 32: case 33: acc = -acc; break;
    default: t3.value += 'unknown opcode: ' + opcode + '\r\n'; running = false;
  }
  if (isNaN(acc) || isNaN(idx)) {
    running = false; t3.value += 'value error stop at: ' + (pc - 1) + '.\r\n';
  }
  if (running) { setTimeout(step, 0); return; }
  mdisp();
}
function mdisp() {
  r0.value = String(acc); r1.value = String(idx); t4.value = '';
  for (var i = 0; i < mem.length; ++i) {
    t4.value += hex(mem[i]) + '\r\n';
  }
}
function prof() {
  t0.value = '';
  for (var i = 0; i < mem.length; ++i) { t0.value += cnt[i] + '\r\n'; }
  if (running) { setTimeout(prof, 500); }
}
function stop() {
  running = false;
}