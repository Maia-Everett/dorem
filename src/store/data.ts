import { computed, ref } from "vue";
import type { ICategory, IType } from "../types/Data";
import type { PinOutput } from "../types/validators";

export const pins = ref<PinOutput[]>([]);
export const types = ref<IType[]>([]);
export const categories = ref<ICategory[]>([]);

export const getCategoryTypes = computed(
    () => (category: ICategory) => types.value.filter((t) => t.categoryId === category.id)
);
export const getTypePins = computed(() => (type: IType) => pins.value.filter((p) => p.typeId === type.id));

export const initialize = async () => {
    const categoryIndex = { categories: [] };
    categories.value = categoryIndex.categories;
    let _types: IType[] = [];
    let _pins: PinOutput[] = [];
    types.value = _types;
    pins.value = _pins;
};

export const upsertPrivatePin = (pin: PinOutput) => {
    let _pin = pins.value.find((p) => p.id === pin.id);
    if (_pin) Object.assign(_pin, pin);
    else {
        pins.value.push({
            ...pin,
        });
    }
    savePrivatePins();
};

export const deletePrivatePin = (id: string) => {
    pins.value = pins.value.filter((p) => p.id !== id);
    savePrivatePins();
};

export const toggleType = (pinType: IType) => {
    types.value.find((t) => t.id === pinType.id)!.visible = !pinType.visible;
};

const savePrivatePins = () => {
    localStorage.setItem("pins", JSON.stringify(pins.value.filter((p) => p.status === "private")));
};
