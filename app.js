function post(url) {
  var xhr = new XMLHttpRequest();
  return new Promise((resolve, reject) => {
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(new Error(`Unexpected status code ${xhr.status}`));
        }
      }
    };
    xhr.open('POST', url, true);
    xhr.send();
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

function connectRobot(robotId, callback) {
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
document.onload = function() {
  createRobot('nxt1', 'COM3', (id) => { nxt1_id = id; });
  createRobot('nxt1', 'COM6', (id) => { nxt2_id = id; });
  createRobot('ev3', '', (id) => { ev3_id = id; });

}
