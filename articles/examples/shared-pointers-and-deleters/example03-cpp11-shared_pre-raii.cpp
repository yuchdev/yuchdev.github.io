#include <cstdlib>
#include <iostream>
#include <memory>

// runtime decision from CLI
// ./example03 -> uses new/delete
// ./example03 x -> uses malloc/free
int main(int argc, char** argv)
{
    bool use_malloc = (argc > 1);
    std::shared_ptr<int> ptr(
        use_malloc
            ? static_cast<int*>(std::malloc(sizeof(int)))
            : new int,
        [use_malloc](int* p)
        {
            if (!p) return;

            if (use_malloc)
            {
                std::cout << "free()\n";
                std::free(p);
            }
            else
            {
                std::cout << "delete\n";
                delete p;
            }
        });

    *ptr = 42;
    std::cout << *ptr << std::endl;
}
