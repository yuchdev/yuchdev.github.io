#include <iostream>

void f(int* p) 
{
    std::cout << "Inside f(), before delete:\n";
    std::cout << "  p = " << static_cast<const void*>(p) << '\n';

    delete p;
    p = nullptr; // only local parameter is changed

    std::cout << "Inside f(), after p = nullptr:\n";
    std::cout << "  p = " << static_cast<const void*>(p) << '\n';
}

int main() 
{
    int* x = new int{99};

    std::cout << "In main(), before f(x):\n";
    std::cout << "  x = " << static_cast<const void*>(x) << '\n';

    f(x);

    std::cout << "In main(), after f(x):\n";
    std::cout << "  x = " << static_cast<const void*>(x) << "  <-- still dangling\n";

    // std::cout << *x << '\n'; // UB: dangling pointer
}
