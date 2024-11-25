'use client';

import Image from "next/image";
import clsx from "clsx";
import { toast } from "react-toastify";
import { SubmitHandler, useForm, UseFormRegister } from "react-hook-form";
import { DeleteTaskById } from "@/actions/task/delete-task-by-id";
import { EditTaskById } from "@/actions/task/edit-task-by-id";
import { useUIStore } from "@/store/ui-store";
import { useTaskFormStore } from "@/store/task-form-store";
import type { Task, TaskIcon, TaskStatus } from "@/interfaces/task.interface";

export const ModalTaskEditor = () => {
  const isOpenTaskModal = useUIStore(state => state.isOpenTaskModal);
  const closeTaskModal = useUIStore(state => state.closeTaskModal);

  return (
    <div>
      {isOpenTaskModal && <div onClick={closeTaskModal} className="fade-in fixed top-0 left-0 z-10 w-full h-full bg-[#00000033]"></div>}
      {isOpenTaskModal && (
        <div className="fixed top-[14px] right-[14px] z-20 w-[626px] max-w-[calc(100%-28px)] px-[22px] py-4 rounded-xl space-y-2 bg-white">
          <div className="flex justify-between">
            <h1 className="text-xl font-medium">Task details</h1>
            <button
              onClick={closeTaskModal}
              className="w-9 h-9 border rounded-lg bg-[url('/close_ring_duotone-1.svg')] bg-center bg-no-repeat hover:bg-slate-200"
            >
            </button>
          </div>
          <Form />
        </div>
      )}
    </div>
  );
};

const Form = () => {
  const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<Task>();
  const currentTask = useTaskFormStore(state => state.currentTask);
  const setCurrentTask = useTaskFormStore(state => state.setCurrentTask);
  const closeTaskModal = useUIStore(state => state.closeTaskModal);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    if (currentTask) {
      setCurrentTask({ ...currentTask, [name]: value });
    }
  };

  const handleDelete = async () => {
    if (!currentTask) return null;

    const result = await DeleteTaskById(currentTask?.id);

    if (!result.ok) toast.error(result.message);

    toast.success(result.message);
    closeTaskModal();
  };

  const onSubmit: SubmitHandler<Task> = async (data) => {
    if (!currentTask) return;

    const result = await EditTaskById(currentTask.id, data);

    if (!result.ok) toast.error(result.message);

    toast.success(result.message);
    closeTaskModal();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="relative">
        <Label content="Task name" />
        <input
          type="text"
          placeholder="Enter a name"
          className="w-full px-4 py-2 rounded-lg outline-none border-2 border-[#E3E8EF] focus:border-[#3662E3]"
          {...register('name', { value: currentTask?.name, onChange: handleInputChange, required: true })}
        />
        {errors.name?.type === 'required' && <p className="absolute top-full left-0 text-sm text-red-500">Name is required</p>}
      </div>
      <div>
        <Label content="Description" />
        <textarea
          placeholder="Enter a short description"
          className="w-full h-44 px-4 py-2 rounded-lg outline-none border-2 border-[#E3E8EF] focus:border-[#3662E3] resize-none"
          {...register('description', { value: currentTask?.description, onChange: handleInputChange })}
        >
        </textarea>
      </div>
      <div className="relative">
        <Label content="Icon" />
        <div className="flex gap-x-3">
          <IconRadioButton content="👨🏻‍💻" icon={currentTask?.icon} value={'man-working'} handleChange={handleInputChange} register={register} />
          <IconRadioButton content="🗨️" icon={currentTask?.icon} value={'dialog'} handleChange={handleInputChange} register={register} />
          <IconRadioButton content="☕" icon={currentTask?.icon} value={'coffee'} handleChange={handleInputChange} register={register} />
          <IconRadioButton content="🏋🏻‍♂️" icon={currentTask?.icon} value={'weightlifter'} handleChange={handleInputChange} register={register} />
          <IconRadioButton content="📚" icon={currentTask?.icon} value={'books'} handleChange={handleInputChange} register={register} />
          <IconRadioButton content="⏰" icon={currentTask?.icon} value={'clock'} handleChange={handleInputChange} register={register} />
        </div>
        {errors.icon?.type === 'required' && <p className="absolute top-full left-0 text-sm text-red-500">Icon is required</p>}
      </div>
      <div>
        <Label content="Status" />
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          <StatusRadioButton content="In Progress" status={currentTask?.status} value={'in-progress'} handleChange={handleInputChange} register={register} />
          <StatusRadioButton content="Completed" status={currentTask?.status} value={'completed'} handleChange={handleInputChange} register={register} />
          <StatusRadioButton content="Won't do" status={currentTask?.status} value={'wont-do'} handleChange={handleInputChange} register={register} />
        </div>
      </div>
      <div className="h-36 flex justify-end items-end gap-x-4">
        <button
          type="button"
          className="px-6 py-2 flex items-center gap-x-2 rounded-3xl text-sm text-white bg-[#97A3B6]"
          onClick={handleDelete}
        >
          Delete
          <Image
            src={'/Trash.svg'}
            alt="trash-icon"
            width={20}
            height={20}
          />
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className={clsx(
            "px-6 py-2 flex items-center gap-x-2 rounded-3xl text-sm text-white bg-[#3662E3]",
            isSubmitting && "bg-[#3661e3d5]"
          )}
        >
          Save
          {isSubmitting ? (
            <Image
              src={'/loader.svg'}
              alt="loader-icon"
              width={20}
              height={20}
              className="animate-spin"
            />
          ) : (
            <Image
              src={'/Done_round.svg'}
              alt="done-icon"
              width={20}
              height={20}
            />
          )}
        </button>
      </div>
    </form>
  );
};

interface LabelProps {
  content: string;
}

const Label = ({ content }: LabelProps) => {
  return (
    <label className="w-full text-xs font-medium text-[#97A3B6]">
      {content}
    </label>
  );
};

interface IconRadioButtonProps {
  content: string;
  icon: TaskIcon | undefined;
  value: TaskIcon;
  handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  register: UseFormRegister<Task>;
}

const IconRadioButton = ({ content, icon, value, handleChange, register }: IconRadioButtonProps) => {
  return (
    <label className="relative block w-11 h-11 rounded-xl cursor-pointer overflow-hidden [&:hover_>_input_+_span]:bg-slate-300 [&_>_input:checked_+_span]:bg-[#F5D565]">
      <input type="radio" className="absolute w-0 h-0 opacity-0" {...register('icon', { onChange: handleChange, required: true })} checked={icon === value} value={value} />
      <span className="w-full h-full flex justify-center items-center text-2xl select-none bg-[#E3E8EF]">{content}</span>
    </label>
  );
};

interface StatusRadioButtonProps {
  content: string;
  status: TaskStatus | undefined;
  value: TaskStatus;
  handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  register: UseFormRegister<Task>;
}

const StatusRadioButton = ({ content, status, value, handleChange, register }: StatusRadioButtonProps) => {
  return (
    <label className="relative block rounded-2xl cursor-pointer">
      <input type="radio" {...register('status', { onChange: handleChange })} checked={status === value} value={value ?? ''} className="peer absolute w-0 h-0 opacity-0" />
      <div className="flex items-center rounded-2xl p-[2px] pr-3 border-2 border-[#E3E8EF] peer-checked:border-[#3662E3] peer-checked:[&_>_div:last-child]:bg-[#3662E3]">
        <div className={clsx(
          "w-11 h-11 rounded-xl bg-center bg-no-repeat",
          value === 'in-progress' && "bg-[#E9A23B] bg-[url('/Time_atack_duotone.svg')]",
          value === 'completed' && "bg-[#32D657] bg-[url('/Done_round_duotone.svg')]",
          value === 'wont-do' && "bg-[#DD524C] bg-[url('/close_ring_duotone.svg')]"
        )}></div>
        <span className="flex-1 ml-3 font-medium">{content}</span>
        <div className="w-5 h-5 rounded-full bg-[url('/Done_round.svg')] bg-center bg-[length:13px] bg-no-repeat"></div>
      </div>
    </label>
  );
};