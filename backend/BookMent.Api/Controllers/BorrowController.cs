using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;

[ApiController]
[Route("api/[controller]")]
public class BorrowController : ControllerBase
{
    private readonly ApplicationDbContext _db;
    public BorrowController(ApplicationDbContext db) { _db = db; }

    [Authorize]
    [HttpPost("borrow/{bookId}")]
    public async Task<IActionResult> Borrow(int bookId)
    {
        var book = await _db.Books.FindAsync(bookId);
        if (book == null) return NotFound("Book not found");
        if (book.CopiesAvailable <= 0) return BadRequest("No copies available");

        var userId = User.FindFirstValue(JwtRegisteredClaimNames.Sub) ?? User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId is null) return Unauthorized();

        var br = new BorrowRecord
        {
            BookId = bookId,
            UserId = userId,
            BorrowedAt = DateTime.UtcNow,
            DueAt = DateTime.UtcNow.AddDays(14)
        };
        book.CopiesAvailable -= 1;
        _db.BorrowRecords.Add(br);
        await _db.SaveChangesAsync();
        return Ok(br);
    }

    [Authorize]
    [HttpPost("return/{borrowId}")]
    public async Task<IActionResult> Return(int borrowId)
    {
        var br = await _db.BorrowRecords.Include(r => r.Book).FirstOrDefaultAsync(r => r.Id == borrowId);
        if (br == null) return NotFound();
        if (br.IsReturned) return BadRequest("Already returned");

        br.ReturnedAt = DateTime.UtcNow;
        if (br.Book != null) br.Book.CopiesAvailable += 1;
        await _db.SaveChangesAsync();
        return Ok(br);
    }

    [Authorize]
    [HttpGet("myborrows")]
    public async Task<IActionResult> MyBorrows()
    {
        var userId = User.FindFirstValue(JwtRegisteredClaimNames.Sub) ?? User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId is null) return Unauthorized();
        var list = await _db.BorrowRecords.Include(r => r.Book).Where(r => r.UserId == userId).ToListAsync();
        return Ok(list);
    }
}
