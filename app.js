function post(url, body) {
  var xhr = new XMLHttpRequest();
  return new Promise((resolve, reject) => {
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.responseText ? JSON.parse(xhr.responseText) : null);
        } else {
          reject(new Error(`Unexpected status code ${xhr.status}`));
        }
      }
    };
    xhr.open('POST', url, true);
    if (body) {
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(body);
    } else {
      xhr.send();
    }
  });
}


function createRobot(type, comport, callback) {
  comport = comport || 'COM0';
  var body = JSON.stringify({
    name: `${type}:${comport}`,
    type: type,
    comport
  });

  post('http://localhost:5000/robots', body)
    .then((body) => callback(null, body.id));
}

function connectRobot(robotId) {
  console.log('connecting', robotId);
  post(`http://localhost:5000/robots/${robotId}/connect`);
}

function forwards(robotId) {
  console.log('forwarding', robotId);
  post(`http://localhost:5000/robots/${robotId}/forward`);
}

function backwards(robotId) {
  console.log('reversing', robotId);
  post(`http://localhost:5000/robots/${robotId}/reverse`);
}

function left(robotId) {
  console.log('turning left', robotId);
  post(`http://localhost:5000/robots/${robotId}/left`);
}

function right(robotId) {
  console.log('turning right', robotId);
  post(`http://localhost:5000/robots/${robotId}/right`);
}


var nxt1_id, nxt2_id, ev3_id, roomba_id;
window.onload = function() {
  createRobot('nxt1', 'COM3', (err, id) => { nxt1_id = id; connectRobot(id); });
  createRobot('nxt1', 'COM6', (err, id) => { nxt2_id = id; connectRobot(id); });
  createRobot('ev3', '', (err, id) => { ev3_id = id; });
};
