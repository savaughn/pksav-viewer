#include "emscripten.h"
#include "pksav.h"
#include <stdio.h>
#include <string.h>

int load_save_file(const char file_path[100]);

EMSCRIPTEN_KEEPALIVE
int load_save_file(const char file_path[100]) {
    enum pksav_error error = PKSAV_ERROR_NONE;
    struct pksav_gen1_save pkmn_save;
    error = pksav_gen1_load_save_from_file(file_path, &pkmn_save);
    printf("Loading save file: %s\n", file_path);
    if (error != PKSAV_ERROR_NONE) {
        printf("Error loading save file: %d\n", error);
        return 1;
    } else {
        printf("Save file loaded successfully\n");
    }
    char trainer_name[8] = {"\0"};
    pksav_gen1_import_text(pkmn_save.trainer_info.p_name, trainer_name, 7);
    printf("Trainer name: %s\n", trainer_name);

    return PKSAV_ERROR_NONE;
}
