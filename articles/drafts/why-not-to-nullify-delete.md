# Why `delete p; p = nullptr;` Is Not a Safety Strategy

Sometimes I see a Junior Engineer with fire in his eyes, convinced he has just invented a brilliant C++ design rule:

> “After every `delete`, set the pointer to `nullptr`.”

At that moment, in his mind, memory safety has been achieved, undefined behavior has been defeated, and somewhere in the distance Bjarne Stroustrup nods in approval.

Unfortunately, C++ is not impressed.

The problem is not that setting a pointer to `nullptr` is always useless. The problem is that it affects exactly one variable. One. Singular. The chosen one. It does not send a mystical invalidation wave through your process. It does not notify every alias. It does not patch every copy in every container, member field, callback, or forgotten corner of the call graph.

When you `delete` a dynamically allocated object, its lifetime ends and its storage is released. Any other raw pointer that still stores that address does not become magically safer. It simply becomes dangling. ([CPP Reference][2])

And that is where the folklore advice collapses.

Take [Example 1 – Chain of Aliases](https://godbolt.org/clientstate/eJzNks9OAyEQxl9lgof%2B3bRuPLHbJvYFPHlyTYMwbYkUCLA1ZtN3d%2BimtSY28ShcGGbmN3zk61jEGLWzkfGX4SZCtF3Tw0ujVUUHQawHZqIhmBpW5vDqRVoHeptpwkYrNUXBlN3BvMh1dWMLA5NF0fKgzD8hkg0jT3K7sB1Cr1GWGU1b82X6cWdEF37j2HBKfH%2BpmNJJbFaa5ppq9WKYtJPl8n5xvM3XRc4Anfhtjdh1fHyhvhF8i4X4NWq15owmPo%2FZiScyjzKS77KMJMvjsic5T9LMQzld2h31p2lxlmVrnHWyo7uhfv9DDj7%2FDMWH9w2I7AQq) and the illusion disappears immediately. `p` is null. `p2` is not. One variable looks clean, the other is a trap with good manners.

The same thing happens when ownership has already escaped. In [Example 2 – Ownership Escapes the Factory](https://godbolt.org/clientstate/eJytUstOwzAQ%2FJWVOfQZtXBBStJK9Ac4cSKospxtsXBty95Aqqj%2FzrqlCUhwIz5Eq52dGa%2BnExFj1M5GkT6dJ0WvqWnYtlaK%2FEIIaA6Xg3n2Kj1NoMPjRyl4K8PGcBt%2FnkJxwGIb7xhcD1y1jblQ3Acvd75%2BGt0aT4xP3qWhY1JX8g1XENIczJTpC6SezUqlQY2v6pOjlwm7dbrfzOblclm1W0Ui5sVx6xwLom6s4%2B1Uq3hjjlwm7dV3XZshT5t4RxnPPLodQWwN9e9c6zQwO4M%2F1v4xzRcTrYbL9nZP0FBcyuH7EPg%2Fup8Vh2n6p9b0W9m6WNg%2Bl0Ch5hLqJbn7AjKfG1xAoLePOm4r8gB7Hzj3bZ5K1lVnTO%2BFE7q5S6v9jSXmAUNQrfxN0Y2V5b%2FmuGfYzVYaqT%2Fl0nE%2Bk0tpXcGm7MjE%2FPuKufWN2lETW9T5wzw2Lw%3D%3D), a function can return a raw pointer, but once it has done so, the universe of aliases is no longer under control. The pointer may now live in one variable, three variables, a vector, a member, or a bug report waiting to happen.

And then comes the classic disappointment: “Fine, I’ll set it to `nullptr` inside the cleanup function.” Excellent. That brings us to [Example 3 – Parameter Is Just a Copy](https://godbolt.org/clientstate/eJytkz1PwzAQhv%2FKyQxNP6IWtjppBzYmJiaCKuM4xcKxLduBoKj%2FnTNpU5BKYWgyRCffPffe61xHvPBeGu0Jg9L41PBiuqJ5jYqkImUNW1RLQ4ugkCeEhDGgMewbL7v8YhX7CQUCCLFN2dtmN2XVC2ACzD4vl1UiKBc1C1u9Wm5UFVMgdBvHavE58i6hjb6u8JTBv%2Bo6nRt1DJvVfM%2FM9uCdKqJqpxqS0J6vknZyBy2INZvWaY7c2sAL0r5hYa1QmWhjO%2B6YzEOxKfNofLhQWwVub18aD6B5b4H6nDr9Yw%2BJKsp2%2FfE0EuRjW5n5w6P0vPcxwBd7WzQeyBqW9s8fi6l1DKnD9pN5fPCQJHuE7S0TF6w5%2BuWwuSROmRVaF3U7CJ8OT7g15Z4P7F8roF9nmjlwmC7GkffkzVn4uKUD0Fnu1Oa3n6vCw0Lz7P2et5c5L4h0PqJYj0i6Cw%3D%3D). Function parameters are copies unless you deliberately pass by reference. Nulling the local parameter changes the callee’s local copy. The caller’s pointer remains a dangling souvenir.

Containers are no more sentimental. In [Example 4 – Container Keeps Its Own Copy](https://godbolt.org/clientstate/eJzNkstuwjAQRX9l5C54pjy6SwJS%2BYGuuiIIuc6EWiS25Ue6QPx7x4RHkYq6rbOJZ%2B4cj67ugTl0TmrlWLo%2FLOQ4Rz4KmMqm03k5t0CqgqsOJVmqKbS9t1XfXowwQX5lX0iQmLqJJykxph5YOq33SBIj5w9bXWq7aGdVdQ0bnM0Tao6bPXk7RW2nHOC7Q33Ry8g0H3Xnr6dgQQ8q3g7w22m6SxZ7%2FDLJJ7w8w8Ks6jriHC5EL2D0iQYv1m2bMqzW84bqP7jGx36QJPdP6e7x7qN3g4pW0d2Ck%2FMpdbL6PGzYJtK4eV7wZPIGF%2BTx%2B76gW3t8L4%2F%2BB0Nyy8np8W2n%2Fx5gu3cyeQIZL2h%2Bv9PeY%2BBGGZ5kSxRf6Ffk%3D), the vector has its own copy of the address. Null the original variable all you like; `v[0]` still points to dead storage.

Member fields are just as indifferent. [Example 5 – Member Alias Still Dangles](https://godbolt.org/clientstate/eJzNks9OwzAMxl%2FFCof9LRtIu3TdpO0FOHGiaAqJO0WkTtUkcKj27jjrGExi2pVUleLk8y%2B29XXCo%2FfGkR4xvDLEvH9WGgRaD1h2EEtN02pM2jI6W3ZFCu4SiS%2Bf3q2ScIYt0GxwQx6N8m%2FoTbeKaR3VgNTm2l1eQ6h2z6vUHgM9m5Hn5C7hU1a4zv0mY7kQTM2rK0m0w4rD4qvY5XlQ8G42Wm4jXo8cRxjv0zA9JrH0NGr9y1sBl7f2b5Fgzw02P67tyt5mxo7Vf9wD1%2Bq7mD8R7A6aqrwVj5Q6gQduA%2BLtbr5m0QmZVQ8m9j96s06kt6rIpu1xMdly1Zn6kVh5t%2B4pP3wVdUt6b2BSnH9NTAJt8g8JX6UZx1f9B0tGzH0%3D) shows the same story in a slightly nicer suit.

So no, “just set it to `nullptr` after `delete`” is not a safety model. It is, at best, a narrow local hygiene trick. It can sometimes prevent an accidental second `delete` through that exact same variable in old manual-memory code. That is all. It does not solve aliasing. It does not solve lifetime. It does not solve ownership.

Worse, it can create false confidence. One pointer is null, another alias is dangling, and the bug becomes harder to notice because part of the scene now looks tidy.

What actually works is not a ritual, but a model.

In modern C++, the default owning raw pointer should be replaced with `std::unique_ptr` whenever ownership is exclusive. If ownership is genuinely shared, use `std::shared_ptr`. And if something needs to observe a shared object without extending its lifetime, that is exactly the job of `std::weak_ptr`: it is a non-owning reference to an object managed by `shared_ptr`, and `lock()` gives you a temporary `shared_ptr` if the object is still alive, or an empty one if it is already gone. ([CPP Reference][3])

That complexity is not accidental decoration. C++ is complicated because the problems it tries to express are complicated: ownership, aliasing, lifetime, cost of abstraction, deterministic destruction, interoperability with C, zero-overhead intent, and fine control over memory and performance. Most of its “strange” design decisions exist because someone, somewhere, hit a very real wall and the language had to offer a tool for that wall.

Yes, from the outside it can look excessive. Yes, some corners are ugly. And yes, one can still argue that a few library choices were made by gremlins.

But most of the time, C++ is not being weird for fun. It is being specific because reality is specific.

And that is why many “obvious” simplifications proposed by enthusiastic newcomers turn out not to be simplifications at all. They are merely ways to hide the real problem behind a cleaner-looking variable.

Except `vector<bool>`, of course.

That one remains an unsolved emotional event.
