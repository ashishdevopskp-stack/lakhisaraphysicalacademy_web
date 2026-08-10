import Link from "next/link";
import { AdminSidebar } from "../_components/AdminSidebar";

export interface BatchRecord {
  id: string;
  name: string;
  time: string;
  category: string;
  status: string;
  capacity: number;
}

const SAMPLE_BATCHES: BatchRecord[] = [
  {
    id: "b1",
    name: "Morning Physical Training (मॉर्निंग फिजिकल बैच)",
    time: "05:00 AM - 07:30 AM",
    category: "Physical",
    status: "Filling Fast",
    capacity: 150,
  },
  {
    id: "b2",
    name: "Evening Physical & Stamina Batch",
    time: "04:30 PM - 06:30 PM",
    category: "Physical",
    status: "Open",
    capacity: 100,
  },
  {
    id: "b3",
    name: "Written Exam Mastery Batch (लिखित परीक्षा स्पेशल)",
    time: "10:30 AM - 01:30 PM",
    category: "Written",
    status: "Open",
    capacity: 80,
  },
];

export default function AdminBatchesPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col lg:flex-row">
      <AdminSidebar active="Batches" />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-5xl w-full">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-semibold mb-1">Training Batches</h1>
            <p className="text-sm text-gray-500">
              Manage training batch timings, capacities, and active schedules.
            </p>
          </div>
          <button className="inline-block text-center text-sm px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors">
            + Create New Batch
          </button>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <div className="divide-y divide-gray-100">
            {SAMPLE_BATCHES.map((batch) => (
              <div
                key={batch.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 hover:bg-gray-50 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                      {batch.category}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {batch.status}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-gray-900">{batch.name}</h3>
                  <p className="text-sm text-gray-500 mt-0.5">
                    Timing: {batch.time} | Max Capacity: {batch.capacity} Students
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button className="text-sm text-gray-600 hover:text-gray-900 font-medium">
                    Edit
                  </button>
                  <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
