package main

import (
	"fmt"
	"log"
	"os"
	"sort"
	"unicode"

	"github.com/gocolly/colly"
)

func printLines(filePath string, lines []string) error {
	f, err := os.Create(filePath)
	if err != nil {
		return err
	}
	defer f.Close()
	for _, line := range lines {
		fmt.Fprintln(f, line)
	}
	return nil
}

func main() {
	c := colly.NewCollector()

	words := []string{}
	pageCounter := 1

	c.OnError(func(_ *colly.Response, err error) {
		log.Println("Something went wrong:", err)
	})

	c.OnHTML("#mw-pages li a", func(e *colly.HTMLElement) {
		if unicode.IsLower(([]rune(e.Text))[0]) {
			words = append(words, e.Text)
		}
	})

	c.OnHTML("#mw-pages a[href]", func(e *colly.HTMLElement) {
		if e.Text == "Следующая страница" {
			fmt.Println("Page:", pageCounter)
			pageCounter++
			e.Request.Visit(e.Attr("href"))
		}
	})

	c.Visit("https://ru.wiktionary.org/w/index.php?title=%D0%9A%D0%B0%D1%82%D0%B5%D0%B3%D0%BE%D1%80%D0%B8%D1%8F:%D0%A0%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B5_%D1%81%D1%83%D1%89%D0%B5%D1%81%D1%82%D0%B2%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D0%B5")

	sort.Strings(words)

	fmt.Println(len(words))
	err := printLines("words.txt", words)
	if err != nil {
		log.Fatal(err)
	}
}
