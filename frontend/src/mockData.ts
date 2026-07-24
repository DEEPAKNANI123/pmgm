export const mockData = {
  performanceMetrics: [
    {
      id: "EMP-1001",
      name: "Alex Johnson",
      attendance_percentage: 82,
      output_score: 75,
      rejection_rate: 12,
      declineDetected: true,
      rootCause: "Machine malfunction coupled with unscheduled absences",
      severity: "High",
      confidence: 88,
      recommendedActions: ["Schedule maintenance for Machine B", "Conduct 1-on-1 regarding attendance"],
      pip: {
        goal: "Improve attendance to >95% and reduce rejection rate to <5%",
        weekly_targets: ["Week 1: 100% attendance", "Week 2: 0 defects on initial run"],
        review_frequency: "Weekly",
        success_metrics: ["Attendance > 95%", "Output > 90%", "Rejection < 5%"]
      }
    },
    {
      id: "EMP-1002",
      name: "Sarah Chen",
      attendance_percentage: 98,
      output_score: 95,
      rejection_rate: 2,
      declineDetected: false
    },
    {
      id: "EMP-1003",
      name: "Michael Torres",
      attendance_percentage: 84,
      output_score: 88,
      rejection_rate: 4,
      declineDetected: false
    }
  ],
  contractWorkerRisk: [
    {
      id: "CW-205",
      name: "David Smith",
      attendance_rate: 78,
      late_marks: 4,
      absent_days: 3,
      actual: 85,
      target: 100,
      quality_score: 80,
      reliability_score: 55.4,
      attrition_risk: 44.6,
      risk_summary: "High risk due to frequent tardiness and missed targets.",
      attrition_cause: "Potential burnout or scheduling conflicts.",
      recommended_action: "Initiate supportive dialogue. Review shift allocation.",
      urgency: "High"
    },
    {
      id: "CW-206",
      name: "Priya Patel",
      attendance_rate: 100,
      late_marks: 0,
      absent_days: 0,
      actual: 110,
      target: 100,
      quality_score: 95,
      reliability_score: 98,
      attrition_risk: 2,
      risk_summary: "Low risk. High performer.",
      attrition_cause: "N/A",
      recommended_action: "Provide positive reinforcement.",
      urgency: "Low"
    }
  ],
  voiceReviews: [
    {
      id: "VR-001",
      employee_id: "EMP-1001",
      transcript: "Alex has been struggling lately with attendance. The output is lower than last quarter. However, his teamwork is still very strong and he helps others when he is here.",
      language: "English",
      strengths: ["Strong teamwork", "Helpful to peers"],
      improvements: ["Attendance consistency", "Output volume"],
      competencies: [
        { name: "Teamwork", rating: "High" },
        { name: "Reliability", rating: "Low" }
      ],
      sentiment: "Mixed",
      journal_comment: "Supervisor noted attendance issues but praised teamwork."
    },
    {
      id: "VR-002",
      employee_id: "EMP-1002",
      transcript: "Sarah is doing exceptional work. Her quality is top notch and she's always on time.",
      language: "English",
      strengths: ["Exceptional quality", "Punctuality"],
      improvements: [],
      competencies: [
        { name: "Quality Focus", rating: "High" },
        { name: "Punctuality", rating: "High" }
      ],
      sentiment: "Positive",
      journal_comment: "Outstanding performance review."
    }
  ],
  summaryStats: {
    avgAttendance: 92,
    avgOutput: 89,
    highRiskWorkers: 1,
    activePIPs: 1
  }
};
