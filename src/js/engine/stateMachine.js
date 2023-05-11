/**
 * Base class to create custom states
 */
export class State {
  constructor(parent) {
    this.parent_ = parent;
  }

  Enter() {}
  Exit() {}
  Update() {}
}

/* // ! Here is an example state
class ExampleState extends State {
    constructor(parent) {
        super(parent);
    }

    Enter() {}
    Exit() {}
    Update() {}
};
*/

/**
 * Class represents a state machine
 */
export class StateMachine {
  constructor(parent) {
    this.parent_ = parent;
    this.stateHash_ = {};
    this.currentState_ = null;
  }

  /**
   * @param {String} name a unique string
   * @param {State} state class
   * Adds new 'state' to state machine and sets it identifier as 'name'
   */
  AddState(name, state) {
    this.stateHash_[name] = new state(this.parent_);
  }

  /**
   * @param {Strong} name 
   * sets current state to name identifier
   * Assumes name identifier is valid
   */
  GoToState(name) {
    if (name === this.currentState_) return;

    if (this.currentState_) {
      this.stateHash_[this.currentState_].Exit();
    }
    this.stateHash_[name].Enter();
    this.currentState_ = name;
  }

  get CurrentState() {
    return this.currentState_;
  }

  /**
   * Calls update function of current state
   */
  Update() {
    if (this.currentState_) {
      this.stateHash_[this.currentState_].Update();
    }
  }
}

// state machine code inspired by SimonDev (https://github.com/simondevyoutube/Quick_3D_MMORPG/blob/547884332ca650abe96264f7230702d36481b9bc/client/src/player-state.js)