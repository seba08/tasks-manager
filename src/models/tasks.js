import {Schema, model} from "mongoose";

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'El título es obligatorio'],
      trim: true,
      maxlength: [100, 'El título no puede tener más de 100 caracteres'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'La descripción no puede tener más de 500 caracteres'],
    },
    status: {
      type: String,
      enum: ['pendiente', 'en progreso', 'completada'], // Valores aceptados
      default: 'pendiente',
    },
    priority: {
      type: String,
      enum: ['baja', 'media', 'alta'], // Niveles de prioridad
      default: 'media',
    },
    dueDate: {
      type: Date, // Fecha límite de la tarea
      required: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user', // Relación con el modelo de usuario
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now, // Fecha de creación automática
    },
    updatedAt: {
      type: Date,
      default: Date.now, // Actualizado al modificar el documento
    },
  },
  {
    timestamps: true, // Agrega automáticamente createdAt y updatedAt
  }
);

export const TASKS = model('Task', taskSchema);
