import z from "zod";

enum CurrentStatus {
  seen = "seen",
  incomplete = "incomplete",
  completed = "completed",
}

const updateUserAttempt = z.object({
  userId: z.string().nonempty(),
  setId: z.string().nonempty(),
  currentStatus: z.enum(CurrentStatus),
});

export default updateUserAttempt;
