import { Watch } from "lucide-react";

export const labels = [
    {
        value: "bug",
        label: "Bug",
    },
    {
        value: "feature",
        label: "Feature",
    },
    {
        value: "documentation",
        label: "Documentation",
    },
]

export const statuses = [
    {
        value: "backlog",
        label: "Backlog",
        icon: Watch,
    },
    {
        value: "todo",
        label: "Todo",
        icon: Watch,
    },
    {
        value: "in progress",
        label: "In Progress",
        icon: Watch,
    },
    {
        value: "done",
        label: "Done",
        icon: Watch,
    },
    {
        value: "canceled",
        label: "Canceled",
        icon: Watch,
    },
];

export const priorities = [
    {
        label: "Low",
        value: "low",
        icon: Watch,
    },
    {
        label: "Medium",
        value: "medium",
        icon: Watch,
    },
    {
        label: "High",
        value: "high",
        icon: Watch,
    },
];