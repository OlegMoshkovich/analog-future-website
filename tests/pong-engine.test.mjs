import assert from "node:assert/strict";
import test from "node:test";
import { createPong, pongGeometry, resizePong, stepPong } from "../components/site/pong-engine.ts";

const bounds = { width: 1000, height: 400 };
const ready = () => ({ ...createPong(bounds), serve: 0 });

test("a fast ball crosses the left paddle face and returns to the right", () => {
  const game = ready(), g = pongGeometry(bounds);
  Object.assign(game, {x:g.leftX + g.paddleWidth + g.radius + 12, y:200, vx:-650, vy:0, target:200});
  const result = stepPong(game, bounds, "play", .04);
  assert.equal(result.hit, true);
  assert(game.vx > 0);
  assert.equal(game.rally, 1);
});

test("the strategy-side paddle returns the ball to the left", () => {
  const game = ready(), g = pongGeometry(bounds);
  Object.assign(game, {x:g.rightX - g.radius - 9, y:200, vx:650, vy:0});
  assert.equal(stepPong(game, bounds, "watch", .04).hit, true);
  assert(game.vx < 0);
});

test("top and bottom rebounds keep the ball inside the court", () => {
  const g = pongGeometry(bounds);
  for (const [y,vy,sign] of [[g.radius+1,-200,1],[bounds.height-g.radius-1,200,-1]]) {
    const game = {...ready(),x:500,y,vy};
    stepPong(game,bounds,"watch",.02);
    assert.equal(Math.sign(game.vy),sign);
    assert(game.y >= g.radius && game.y <= bounds.height-g.radius);
  }
});

test("a missed return starts a new serve and clears the rally", () => {
  const game = {...ready(),x:-15,y:20,vx:-400,rally:7};
  assert.equal(stepPong(game,bounds,"play",.02).missed,true);
  assert.equal(game.rally,0);
  assert.equal(game.x,bounds.width/2);
  assert(game.serve > 0);
  assert(game.vx < 0);
});

test("resizing to a phone court preserves the rally and playable bounds", () => {
  const game = {...ready(),x:900,y:360,left:350,right:350,target:350,rally:9};
  const phone = {width:300,height:300};
  resizePong(game,bounds,phone);
  const g = pongGeometry(phone);
  assert.equal(game.rally,9);
  assert(game.x >= g.radius && game.x <= phone.width-g.radius);
  assert(game.left + g.paddleHeight/2 < phone.height);
  assert(game.target + g.paddleHeight/2 < phone.height);
});
