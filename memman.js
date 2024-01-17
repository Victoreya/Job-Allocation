class MemoryManager {
    constructor(totalMemorySize, pageSize) {
      this.totalMemorySize = totalMemorySize;
      this.pageSize = pageSize;
      this.memory = new Array(totalMemorySize / pageSize).fill(0);
      this.freeBlocks = [{ start: 0, end: this.memory.length - 1 }];
    }
  
    allocate(jobId, jobSize, executionInterval) {
      let allocatedBlock = null;
  
      // Perform memory allocation based on the selected strategy
      // Best-Fit
      // First-Fit
      // Worst-Fit
      // Choose the strategy by uncommenting the corresponding line
  
      allocatedBlock = this.bestFit(jobSize);
      if (!allocatedBlock) {
        allocatedBlock = this.firstFit(jobSize);
      }
      if (!allocatedBlock) {
        allocatedBlock = this.worstFit(jobSize);
      }
      if (!allocatedBlock) {
        console.log(`Unable to allocate memory for Job ${jobId}`);
        return;
      }
  
      console.log(`Job ${jobId} allocated in memory block ${allocatedBlock.start} - ${allocatedBlock.end}`);
  
      // Run the job for the given execution interval
      setTimeout(() => {
        console.log(`Job ${jobId} completed execution`);
        this.freeBlocks.push(allocatedBlock);
        this.updateJobState(jobId, 'End'); // Update job state to 'End' after completion
      }, executionInterval * 1000);
    }
  
    updateJobState(jobId, jobState) {
      // Find the job in the jobList and update its state
      const job = jobList.find((job) => job.jobId === jobId);
      if (job) {
        job.jobState = jobState;
        console.log(`Job ${jobId} state updated to '${jobState}'`);
      }
    }
  
    // Rest of the code...
  }
  
  // Job list
  const jobList = [
    { jobId: 1, startTime: 1, jobSize: 2, executionInterval: 7, jobState: 'End' },
    { jobId: 2, startTime: 2, jobSize: 3, executionInterval: 8, jobState: 'Sleep' },
    { jobId: 3, startTime: 3, jobSize: 4, executionInterval: 6, jobState: 'End' },
    { jobId: 4, startTime: 4, jobSize: 3, executionInterval: 6, jobState: 'Sleep' },
    { jobId: 5, startTime: 5, jobSize: 2, executionInterval: 9, jobState: 'Sleep' },
    { jobId: 6, startTime: 6, jobSize: 3, executionInterval: 6, jobState: 'Sleep' },
    { jobId: 7, startTime: 7, jobSize: 2, executionInterval: 6, jobState: 'Sleep' },
  ];
  
  // Memory Manager instance
  const memoryManager = new MemoryManager(20, 1);
  
  // Allocate jobs 1-7
  jobList.forEach((job) => {
    memoryManager.allocate(job.jobId, job.jobSize, job.executionInterval);
  });
  