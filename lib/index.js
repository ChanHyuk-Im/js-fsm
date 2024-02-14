class FSM {
  /**
   * {
   *  status: string;
   *  from: string[];
   *  to: string[];
   *  isFirst: boolean;
   * }[]
   */
  constructor(objList) {
    this.configure = {};

    for (let i = 0; i < objList.length; i++) {
      if (objList[i].isFirst) {
        this.firstStatus = objList[i].status;
        this.previousStatus = null;
        this.currentStatus = this.firstStatus;
      }

      const { status, ...configure } = objList[i];

      this.configure[objList[i].status] = configure;
    }
  }

  /**
   *  status: string; 
   */
  to(status) {
    const availableStatus = this.configure[this.currentStatus].to.includes(status) && this.configure[status].from.includes(this.currentStatus);

    if (!availableStatus) {
      throw new Error(`Cannot change status from '${this.currentStatus}' to '${status}'.`);
    }

    this.previousStatus = this.currentStatus;
    this.currentStatus = status;
  }

  reset() {
    this.previousStatus = null;
    this.currentStatus = this.firstStatus;
  }
}

export default FSM;
