import { nanoid } from "nanoid";
import { computed, ref } from "vue";
import { IAlert } from "../types/Data";

export const currentArea = computed(() => mapLocations.value[mapLocationIndex.value].name);
export const mapLocations = ref([
    {
        name: "Edhellen",
        path: "Map of Novosibirsk sjn.svg",
    },
    {
        name: "English",
        path: "Map of Novosibirsk en.svg",
    },
    {
        name: "Русский",
        path: "Map of Novosibirsk ru.svg",
    }
]);
export const mapLocationIndex = ref(0);
export const currentMapImageSrc = computed(() => mapLocations.value[mapLocationIndex.value].path);
export const alerts = ref<IAlert[]>([]);

export const addAlert = (alert: IAlert) => {
    if (!alert.id) alert.id = nanoid();
    alerts.value.push(alert);
    setTimeout(() => {
        alerts.value = alerts.value.filter((a) => a.id !== alert.id);
    }, 4000);
};
