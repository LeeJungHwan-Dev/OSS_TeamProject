const { RTMClient } = require('@slack/rtm-api');
const greeting = require('./module/greeting');
const token = require('./module/token');
const square = require('./module/square');
const check = require('./module/scheduleModule/checkingScheduleSelect');
const schedule = require('./module/scheduleModule/indexIngSchedule');
const scheduleSender = require('./module/scheduleModule/scheduleSender');

schedule.indexing();

const greetings = ['hi', 'hello', '안녕', '안녕하세요', '누구세요'];

const rtm = new RTMClient(token);
rtm.start();

rtm.sendMessage(
  '전북대학교 통합 지원 챗봇 입니다. 원하는 항목의 내용을 입력해주세요. \n 1. 학사일정 \n 2. 식단조회 \n 3. 학과 사무실 조회',
  'D047ADF9CH4',
);

rtm.on('message', (message) => {
  const { channel } = message;
  const { text } = message;

  if (check.getCheck()) {
    scheduleSender(text, rtm, channel);
  } else if (!isNaN(text)) {
    square(rtm, text, channel);
  } else if (greetings.includes(text)) {
    greeting(rtm, channel);
  } else if (text === '학사일정') {
    rtm.sendMessage('안내 받을 날짜를 이야기해주세요.', channel);
    check.setCheck(true);
  } else {
    rtm.sendMessage(" I'm alives", channel);
  }
});
