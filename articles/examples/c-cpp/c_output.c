#include <stddef.h>
#include <stdlib.h>

extern int process(unsigned char *data, size_t size);

typedef struct {
    unsigned char *data;
    size_t size;
} Buffer;

static void buffer_init(Buffer *buffer, size_t size)
{
    buffer->data = malloc(size);
    buffer->size = size;
}

static void buffer_destroy(Buffer *buffer)
{
    free(buffer->data);
}

int run(size_t size)
{
    Buffer buffer;
    buffer_init(&buffer, size);

    if (buffer.data == NULL)
        return -1;

    int result = process(buffer.data, buffer.size);
    buffer_destroy(&buffer);

    return result;
}
