const adjectives = [
    "Банановый",
    "Андрейный",
    "Мегаластовый",
    "Адреналиновый", 
    "Мегатарковый",
    "Егорефный",
    "Максимный",
    "Паршивый",
    "Эпловский"
]

const nouns = [
    "монитор",
    "телевизор",
    "HDMI",
    "Дом",
    "Микрофон",
    "Телефон",
    "Наушник",
    "процессор",
    "попугай"
]

export function generateMonkeyID(existing: Set<string>): string {
    // Переберу комбинации прилагательных и существительных, найду ранее не встречавшуюся комбинацию и верну.
    for (const adj of adjectives) {
        for (const noun of nouns) {
            const name = adj + "-" + noun
            if (!existing.has(name)) return name
        }
    }
    return "Костыль для функции. Сделаем вид, что имен достаточно"
}