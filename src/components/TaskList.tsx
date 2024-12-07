import React, { useState } from 'react';
import { Share2, Check, Gift } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface TaskListProps {
  onComplete: (reward: number) => void;
}

export const TaskList: React.FC<TaskListProps> = ({ onComplete }) => {
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const tasks = [
    {
      id: 'repost',
      title: 'Repost our announcement',
      reward: 100,
      icon: Share2,
    },
    // Add more tasks here as needed
  ];

  const handleTaskComplete = (taskId: string, reward: number) => {
    if (!completedTasks.has(taskId)) {
      setCompletedTasks(new Set([...completedTasks, taskId]));
      onComplete(reward);
      toast({
        title: "Task Completed! 🎉",
        description: `You earned ${reward} coins!`,
      });
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#E74C3C] to-[#C0392B] p-6 rounded-lg shadow-lg mb-4 animate-fade-in">
      <h3 className="text-white font-bold mb-4 flex items-center">
        <Gift className="mr-2" /> Daily Tasks
      </h3>
      {tasks.map((task) => (
        <div
          key={task.id}
          className="bg-white/10 rounded-lg p-4 mb-2 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <task.icon className="text-yellow-300 w-5 h-5" />
              <span className="text-white">{task.title}</span>
            </div>
            <Button
              onClick={() => handleTaskComplete(task.id, task.reward)}
              disabled={completedTasks.has(task.id)}
              className={`${
                completedTasks.has(task.id)
                  ? "bg-gray-500"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {completedTasks.has(task.id) ? (
                <span className="flex items-center">
                  Completed <Check className="ml-2 w-4 h-4" />
                </span>
              ) : (
                `${task.reward} coins`
              )}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};